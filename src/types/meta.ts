// Define an interface based on the zod schema
export interface MetaOutput {
        ogType: string;
        ogUrl: string;
        ogTitle: string;
        ogDescription: string;
        ogSiteName: string;
        twitterSite: string;
        twitterCreator: string;
        twitterTitle: string;
        twitterDescription: string;
        twitterCard: string;
        ogImage: Array<{
            url: string;
            type: string;
        }>;
        twitterImage: Array<{
            url: string;
        }>;
        ogLocale: string;
        ogDate: string;
        favicon: string;
        charset: string;
        requestUrl: string;
        success: boolean;
};
