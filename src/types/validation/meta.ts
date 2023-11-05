import { z } from 'zod';



// create event
export const urlInput = z.object({
    url: z.string().startsWith('https://', 'Url is not valid').min(1),
});

export const metaOutput = z.object({
    url: z.string(),
    result: z.object({
        ogType: z.string(),
        ogUrl: z.string(),
        ogTitle: z.string(),
        ogDescription: z.string(),
        ogSiteName: z.string(),
        twitterSite: z.string(),
        twitterCreator: z.string(),
        twitterTitle: z.string(),
        twitterDescription: z.string(),
        twitterCard: z.string(),
        ogImage: z.array(z.object({
            url: z.string(),
            type: z.string(),
        })),
        twitterImage: z.array(z.object({
            url: z.string(),
        })),
        ogLocale: z.string(),
        ogDate: z.string(),
        favicon: z.string(),
        charset: z.string(),
        requestUrl: z.string(),
        success: z.boolean(),
    })
})