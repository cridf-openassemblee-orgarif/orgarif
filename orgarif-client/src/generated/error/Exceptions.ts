import { Instant } from '../../domain/datetime';
import { RequestErrorId } from '../domain/FmkIds';

export interface RequestError {
  id: RequestErrorId;
  status: number;
  error: string;
  message: string;
  instant: Instant;
}
