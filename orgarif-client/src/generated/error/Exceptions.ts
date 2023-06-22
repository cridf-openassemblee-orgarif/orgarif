import { Instant } from '../../domain/datetime';
import { RequestErrorId } from '../domain/Ids';

export interface RequestError {
  id: RequestErrorId;
  status: number;
  error: string;
  message: string;
  instant: Instant;
}
