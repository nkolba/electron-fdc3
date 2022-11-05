import { getRuntime } from '/@/index';
import { RuntimeMessage } from '/@/handlers/runtimeMessage';

export const getAllApps = async (message: RuntimeMessage) => {
  const runtime = getRuntime();

  const sourceView = runtime.getView(message.source);
  console.log('xxxxxxxxx sourceView', sourceView);
  if (sourceView && sourceView.content) {
    const wContents = sourceView.content.webContents;
    const data = runtime.getDirectory().retrieveAll();
    console.log('sending app data', data);
    wContents.send('RUNTIME_TOPICS.GET_ALL_APPS', data);
  }
};
