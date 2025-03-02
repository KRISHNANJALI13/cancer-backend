import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async validateUser(uname: string, pwd: string): Promise<{ statusCode: number }> {
    const user = await this.userModel.findOne({ uname }).exec();
    
    if (user && user.pwd === pwd) {
      return { statusCode: 200 }; // Success response
    }

    throw new UnauthorizedException({ statusCode: 401 }); // Unauthorized response
  }
}
