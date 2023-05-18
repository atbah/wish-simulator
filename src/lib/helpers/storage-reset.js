import {
	initialAmount as balance,
	storageVersion,
	version,
	warpPhase
} from '$lib/data/warp-setup.json';
import {
	activeBanner,
	activePhase,
	activeVersion,
	embers,
	oneiric,
	regularPass,
	showStarterBanner,
	specialPass,
	starlight,
	starterRemaining,
	stellarJade,
	warpAmount
} from '$lib/stores/app-store';
import IDBManager from '$lib/stores/idbManager';
import { localConfig, storageLocal } from '$lib/stores/localstorage';

const { clearIDB } = IDBManager;
export const storageReset = async ({ keepSetting = false }) => {
	await clearIDB();

	starterRemaining.set(50);
	showStarterBanner.set(true);
	if (keepSetting) {
		const config = storageLocal.get('config');
		const pity = storageLocal.get('pity');
		const balance = storageLocal.get('balance');
		localStorage.clear();

		storageLocal.set('config', config);
		storageLocal.set('pity', pity);
		storageLocal.set('balance', balance);
		return;
	}

	localStorage.clear();
	stellarJade.set(balance.stellarJade);
	specialPass.set(balance.ticketPass);
	regularPass.set(balance.ticketPass);
	oneiric.set(balance.oneiric);
	embers.set(0);
	starlight.set(0);
	warpAmount.set('default');

	localConfig.set('version', `${version}-${warpPhase}`);
	localConfig.set('storageVersion', storageVersion);
	activeVersion.set(version);
	activePhase.set(warpPhase);
	activeBanner.set(0);
};
