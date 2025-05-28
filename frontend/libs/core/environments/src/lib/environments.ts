import { InjectionToken } from "@angular/core";

export const ENVIRONMENTS_TOKEN: InjectionToken<EnvironmentsConfig> = new InjectionToken<EnvironmentsConfig>('ENVIRONMENTS_TOKEN');

export interface EnvironmentsConfig {
  readonly apiUrl: string;
  readonly apiKey: string;
}