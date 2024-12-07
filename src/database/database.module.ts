import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_DATABASE_HOST'),
        port: configService.get<number>('POSTGRES_DATABASE_PORT'),
        username: configService.get<string>('POSTGRES_DATABASE_USERNAME'),
        password: configService.get<string>('POSTGRES_DATABASE_PASSWORD'),
        database: configService.get<string>('POSTGRES_DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: true, // Need to Disable in production
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
