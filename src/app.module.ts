import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { SarcomaModule } from './sarcoma/sarcoma.module';
import { UploadsModule } from './upload/upload.module';
import { LungModule } from './lung/lung.module';
import { BrainTumorModule } from './brainTumor/brainTumor.module';
import { LeukemiaModule } from './leukemia/leukemia.module';
import { PredictLungModule } from './predictLung/predictLung.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Load environment variables
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/cancer'), // Use default if undefined
    AuthModule,
    SarcomaModule,
    UploadsModule,
    LungModule,
    BrainTumorModule,
    LeukemiaModule,
    PredictLungModule
  ],
})
export class AppModule {}
