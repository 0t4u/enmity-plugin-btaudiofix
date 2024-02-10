import { FormRow, FormSection } from 'enmity/components';
import { SettingsStore } from 'enmity/api/settings';
import { REST, React } from 'enmity/metro/common';
import uuid from 'enmity/utilities/uuid';
import manifest from '../../manifest.json';

interface SettingsProps {
   settings: SettingsStore;
}

export default async ({ settings }: SettingsProps) => {
   const result = await REST.get(`${manifest["remoteLocation"]}?v=${uuid()}`);
   const json = JSON.parse(await result.text);

   const extVer = json.version;

   return <FormSection title='About'>
         <FormRow
            label={
               `${manifest['name']} version: ${manifest['version']}
${(extVer !== manifest['version']) ? `Update available: ${extVer} available from remote.` : 'No updates available.'}
`
            }
         />;
      </FormSection>
};