import { getRuntime } from '/@/index';
import { RuntimeMessage } from '/@/handlers/runtimeMessage';
import { AppIdentifier, ResolveError } from '@finos/fdc3';

export const findInstances = async (message: RuntimeMessage) => {
  const runtime = getRuntime();
  const appIdentifier: AppIdentifier = message.data.appIdentifier;
  if (!appIdentifier?.appId) {
    throw ResolveError.TargetInstanceUnavailable;
  }

  //if there is an instanceId passed in, just get that view

  if (appIdentifier.instanceId) {
    const instance = runtime.getView(appIdentifier.instanceId);
    //ensure that appIds match
    if (instance && instance.directoryData?.appId === appIdentifier.appId) {
      return [
        {
          appId: instance.directoryData?.appId,
        },
      ];
    } else {
      throw ResolveError.TargetInstanceUnavailable;
    }
  }

  //iterate through the views and find matching AppIds...
  const instances: Array<AppIdentifier> = [];
  const views = runtime.getViews();
  views.forEach((instance) => {
    const appId = instance.directoryData?.appId;
    //match on appId
    if (appId && appIdentifier.appId === appId) {
      instances.push({
        appId: appId,
        instanceId: instance.id,
      });
    }
  });
  return instances;
};
