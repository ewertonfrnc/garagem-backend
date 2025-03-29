import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ExercisesModule } from './exercises/exercises.module';
import { RolesModule } from './roles/roles.module';
import { ExerciseModalitiesModule } from './exercise-modalities/exercise-modalities.module';
import { MuscleGroupsModule } from './muscle-groups/muscle-groups.module';
import { ExerciseCategoriesModule } from './exercise-categories/exercise-categories.module';
import { CategoryFieldsModule } from './category-fields/category-fields.module';

@Module({
  imports: [
    // Config Modules
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Feature Modules
    AuthModule,
    UsersModule,
    DatabaseModule,
    ExercisesModule,
    RolesModule,
    ExerciseModalitiesModule,
    MuscleGroupsModule,
    ExerciseCategoriesModule,
    CategoryFieldsModule,
  ],
})
export class AppModule {}
