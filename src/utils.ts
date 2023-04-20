import { Logger } from '@aws-lambda-powertools/logger';
import { Metrics } from '@aws-lambda-powertools/metrics';
import { Tracer } from '@aws-lambda-powertools/tracer';

const logger = new Logger({
  serviceName: 'aws-http-nest',
  sampleRateValue: 0.7,
  persistentLogAttributes: {
    aws_account_id: process.env.AWS_ACCOUNT_ID || 'N/A',
    aws_region: process.env.AWS_REGION|| 'N/A',
  }
});

const metrics = new Metrics({
  defaultDimensions: {
    aws_account_id: process.env.AWS_ACCOUNT_ID || 'N/A',
    aws_region: process.env.AWS_REGION|| 'N/A',
  }
});

const tracer = new Tracer();

export const  logServices = (message: string)=>{
  logger.appendKeys({
    serviceCalled: message
  });
  logger.warn('Missing \'id\' parameter in path while trying to getter', {
    details: { eventPathParameters: 'N/A' }
  });
  logger.critical('Message critical', {
    details: { eventPathParameters: 'N/A' }
  });
  logger.info('Message critical', {
    details: { eventPathParameters: 'N/A' }
  });
}

export const  tracerServices = ()=>{
  tracer.getSegment();
  tracer.putAnnotation('salva-Respuesta-axios', true);
  tracer.provider.setLogger(logger);
}

export {
  logger,
  metrics,
  tracer
};
