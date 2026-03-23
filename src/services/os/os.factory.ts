import os from "os";
import { IOperatingSystem } from "../../typings";
import { MacAdapter } from "./mac";
import { LinuxAdapter } from "./linux";
import { WindowsAdapter } from "./windows";

export class OsFactory {
    static create(): IOperatingSystem {
        const platform = os.platform();
        switch (platform) {
            case 'darwin': return new MacAdapter();
            case 'linux':  return new LinuxAdapter();
            case 'win32':  return new WindowsAdapter();
            default: throw new Error(`OS ${platform} not support`);
        }
    }
}
