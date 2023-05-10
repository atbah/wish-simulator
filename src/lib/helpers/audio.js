import { localConfig } from '$lib/stores/localstorage';
import { Howl } from 'howler';

const sfxList = [
	'click',
	'close',
	'collection-close',
	'collection-open',
	'express-3star',
	'express-4star',
	'express-5star',
	'switch-banner',
	'reveal-3star',
	'reveal-4star',
	'reveal-5star',
	'sidebar-click',
	'warp-backsound',
	'warpresult-close',
	'warpresult-list'
];

const sounds = sfxList.reduce((prev, current) => {
	const sfx = prev || {};
	sfx[current] = new Howl({
		src: [`/audiofx/${current}.mp3`],
		loop: current === 'warp-backsound'
	});
	return sfx;
}, {});

const sfxids = {};
export const playSfx = (nameOfSoundfx = 'click') => {
	try {
		if (!sounds[nameOfSoundfx]) throw new Error('No Sound effect for ' + nameOfSoundfx);
		if (localConfig.get('muted')) return;
		sfxids[nameOfSoundfx] = sounds[nameOfSoundfx].play();

		if (nameOfSoundfx === 'warp-backsound') {
			sounds[nameOfSoundfx].fade(0, 1, 1000, sfxids[nameOfSoundfx]);
		}
	} catch (e) {
		console.error('Unable to Play Sfx : ', e.message);
	}
};

export const stopSfx = (nameOfSoundfx = 'click') => {
	try {
		if (localConfig.get('muted')) return;
		if (!sounds[nameOfSoundfx]) throw new Error('No Sound effect for ' + nameOfSoundfx);

		sounds[nameOfSoundfx].fade(1, 0, 1000, sfxids[nameOfSoundfx]);
	} catch (e) {
		console.error('Unable to Stop Sfx : ', e.message);
	}
};
