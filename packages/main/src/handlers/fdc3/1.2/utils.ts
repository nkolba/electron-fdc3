import { getRuntime } from '/@/index';
import { Context } from 'fdc3-1.2';

export const getChannelContext = async (
  channel: string,
  contextType?: string,
): Promise<Context | null> => {
  const runtime = getRuntime();

  let ctx: Context | null = null;

  const contexts = runtime.getContexts();
  const channelContext = contexts.get(channel);
  console.log('############## getChannelContext', channel, channelContext);
  if (contextType) {
    if (channelContext) {
      ctx =
        channelContext.find((c) => {
          return c.type === contextType;
        }) || null;
    }
  } else {
    ctx = channelContext && channelContext[0] ? channelContext[0] : ctx;
  }

  return ctx;
};
