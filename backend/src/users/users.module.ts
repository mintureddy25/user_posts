import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: [TypeOrmModule.forFeature([User]), // Ensure User entity is provided here
  forwardRef(() => AuthModule),],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UsersModule {}
