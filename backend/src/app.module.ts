// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql', // MySQL as the database type
      host: process.env.MYSQL_HOST, // Load from .env file
      port: parseInt(process.env.MYSQL_PORT || ''),
      username: process.env.MYSQL_USERNAME, // Load from .env file
      password: process.env.MYSQL_PASSWORD, // Load from .env file
      database: process.env.MYSQL_DATABASE, // Load from .env file
      entities: [User], // Add your entities here
      synchronize: true, // For development, set to false in production
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
