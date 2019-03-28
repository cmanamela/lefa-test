import { PlatformTypes } from './Constants';

export const platform = PlatformTypes.Spree;

export const platformIsSpree = () => {
    return platform === PlatformTypes.Spree;
};