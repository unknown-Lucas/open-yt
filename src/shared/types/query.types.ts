import { ChatModel } from 'openai/resources';

export type videoSummaryQuery = {
  model: ChatModel;
  temperature: number;
};
