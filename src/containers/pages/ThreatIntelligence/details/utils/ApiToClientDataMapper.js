import { isArray, isObject, isString } from 'lodash';

const getEvidentTags = advIoc => {
  const tags = [];
  if (isArray(advIoc)) {
    advIoc.forEach(app => {
      if (isString(app)) {
        tags.push({
          tag_key: app,
          tag_type: 'simple',
          tag_label: app,
          details: app,
        });
      }
      if (isObject(app)) {
        Object.keys(app).forEach(a => {
          let applications = isArray(app[a]?.applications)
            ? app[a]?.applications
            : [];
          if (
            isObject(app[a]?.applications) &&
            !isArray(app[a]?.applications)
          ) {
            Object.keys(app[a]?.applications).map(k => {
              if (k === 'download') {
                applications.push({
                  app_id: 'download',
                  app_product_name: 'download',
                  link: app[a]?.applications?.[k]?.[0]?.link,
                  actions: [],
                });
              } else {
                applications.push(app[a]?.applications?.[k]);
              }
            });
          }
          tags.push({
            tag_key: a,
            tag_label: a,
            applications: applications.map(application => {
              return {
                key: application?.app_id,
                value: application?.app_id,
                label: application?.app_product_name,
                details: application,
                items: isArray(application?.actions)
                  ? application?.actions.map(action => {
                      return {
                        subKey: action?.act_id,
                        value: action?.act_id,
                        subLabel: action?.act_name,
                        details: action,
                        appDetails: application,
                        app: a,
                      };
                    })
                  : [],
              };
            }),
            details: a,
          });
        });
      }
    });
  }
  return tags;
};

export const evidentApiToClientTransform = (advArtifact, advIoc) => {
  if (!isArray(advArtifact)) return [];
  if (!isObject(advIoc)) return [];
  return advArtifact.map(artifcat => {
    return {
      key: artifcat?.am_id,
      value: artifcat?.am_id,
      label: artifcat?.am_name,
      details: artifcat,
      tags: getEvidentTags(advIoc[artifcat?.am_name]),
    };
  });
};

export default { evidentApiToClientTransform };
