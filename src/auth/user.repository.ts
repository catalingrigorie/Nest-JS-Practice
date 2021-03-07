import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User, userTypes } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from './jwt-payload';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async register(AuthCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password, type } = AuthCredentialsDto;

    const user = new User();

    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.type = userTypes[type];

    await user.save().catch((error) => {
      if (error.code === '23505') {
        throw new ConflictException('Username already taken');
      }

      throw new InternalServerErrorException();
    });
  }

  async validateUserPassword(
    authCredentials: AuthCredentialsDto
  ): Promise<JwtPayload> {
    const { username, password } = authCredentials;

    const user = await this.findOne({ username });

    if (user && (await user.validatePassword(password))) {
      return { username: user.username, type: user.type };
    }

    return null;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
