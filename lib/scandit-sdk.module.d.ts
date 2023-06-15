import { ModuleWithProviders } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "./scandit-sdk-barcode-picker.component";
/**
 * Scandit Web SDK Module
 */
export declare class ScanditSdkModule {
    static loaded: boolean;
    constructor(instance: ScanditSdkModule);
    static factory(): void;
    static forRoot(licenseKey: string, options: {
        engineLocation: string;
        preloadEngine?: boolean;
        preloadBlurryRecognition?: boolean;
    }): ModuleWithProviders<ScanditSdkModule>;
    static forChild(): ModuleWithProviders<ScanditSdkModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ScanditSdkModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ScanditSdkModule, [typeof i1.ScanditSdkBarcodePickerComponent], never, [typeof i1.ScanditSdkBarcodePickerComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ScanditSdkModule>;
}
