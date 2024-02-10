import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { React, Native } from 'enmity/metro/common';
import { getByProps } from 'enmity/metro';
import { create } from 'enmity/patcher';
import manifest from '../manifest.json';

import Settings from './components/Settings';

const CommunicationMode = getByProps('setCommunicationModeOn');
const Patcher = create('BTAudioFix');

const SilentTyping: Plugin = {
   ...manifest,

   onStart() {
      Patcher.instead(CommunicationMode, Native.NativeModules.AudioManager === null ? Native.NativeModules.RTNAudioManager : Native.NativeModules.AudioManager, () => {});
   },

   onStop() {
      Patcher.unpatchAll();
   },

   getSettingsPanel({ settings }) {
      return <Settings settings={settings} />;
   }
};

registerPlugin(SilentTyping);
