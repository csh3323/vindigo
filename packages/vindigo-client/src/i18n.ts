import { Dictionary } from "vue-router/types/router";
import VueI18n from "vue-i18n";
import dayjs from "dayjs";
import { keyBy } from "lodash";
import languages from "./languages";
import { logger } from "./util";
import { vue } from ".";

/**
 * The service in charge of interface translations
 * and language loading.
 */
export class I18nService {

	public languageIndex: Dictionary<Language> = {};
	public languageList: Language[] = [];

	private logger = logger('I18n');
	private options: VueI18n.I18nOptions;
	private cachedLangs: string[] = [];
	private defaultLang = 'en-US'
	private initialized = false;
	private currLang!: Language;

	public constructor() {		
		this.options = {
			locale: this.defaultLang,
			fallbackLocale: this.defaultLang
		};
		
		this.languageList = languages;
		this.languageIndex = keyBy(languages, (lang => lang.id));
		this.fetchTranslations(this.defaultLang);
	}

	/**
	 * Returns the current language
	 */
	public get current(): Language {
		return this.currLang;
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
		if(vue.$i18n.locale === lang) {
			return this.setI18nLanguage(lang);
		}

		if(this.cachedLangs.includes(lang)) {
			return this.setI18nLanguage(lang);
		}

		await this.fetchTranslations(lang);
	}

	private setI18nLanguage(lang: string) {
		const language = this.languageIndex[lang];

		document.documentElement.setAttribute('lang', lang);
		dayjs.locale(language.dayjs);
		this.currLang = language;
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
}