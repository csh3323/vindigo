import { store, vue } from ".";

import { Dictionary } from "vue-router/types/router";
import VueI18n from "vue-i18n";
import dayjs from "dayjs";
import { keyBy } from "lodash";
import languages from "./registry/languages";
import { logger } from "./util";

/**
 * The service in charge of interface translations
 * and language loading.
 */
export class I18nService {

	public languageIndex: Dictionary<Language> = {};
	public languageList: Language[] = [];

	private logger = logger('I18n');
	private options!: VueI18n.I18nOptions;
	private cachedLangs: string[] = [];
	private initialized = false;

	/**
	 * Initialize the language service
	 */
	public initialize() {		
		const initialLang = store.instance.state.language;
		
		this.languageList = languages;
		this.languageIndex = keyBy(languages, (lang => lang.id));
		this.options = {
			locale: initialLang,
			fallbackLocale: initialLang
		};

		this.fetchTranslations(initialLang).then(() => {
			store.instance.commit('setLoaded', 'i18n');
		});
	}

	/**
	 * Lock the current i18n service from modifications and
	 * return the final VueI18n instance.
	 * 
	 * @returns The vue i18n instance
	 */
	public complete(): VueI18n {
		if (this.initialized) {
			throw new Error('I18n already configured');
		}

		this.initialized = true;
		return new VueI18n(this.options);
	}

	/**
	 * Download and activate a supported locale
	 * 
	 * @param lang The locale code
	 */
	public async activate(lang: string) {
		if(vue.$i18n.locale === lang || this.cachedLangs.includes(lang)) {
			return this.setI18nLanguage(lang);
		}

		await this.fetchTranslations(lang);
	}

	private setI18nLanguage(lang: string) {
		const language = this.languageIndex[lang];

		document.documentElement.setAttribute('lang', lang);
		store.instance.commit('setLanguage', lang);
		dayjs.locale(language.dayjs);
		vue.$i18n.locale = lang;
	}

	private async fetchTranslations(lang: string) {
		const language = this.languageIndex[lang];

		if(!language) {
			throw new Error(`Unknown language ${lang}`);
		}

		this.logger(`Fetching language ${language.name}`);

		const translations = await import(`./i18n/${lang}.json`);
		await import(`dayjs/locale/${language.dayjs}.js`);

		vue.$i18n.setLocaleMessage(lang, translations);
		this.setI18nLanguage(lang);
		this.cachedLangs.push(lang);
	}

}

/**
 * A single known language locale
 */
export interface Language {
	id: string;
	name: string;
	dayjs: string;
	icon?: string;
}