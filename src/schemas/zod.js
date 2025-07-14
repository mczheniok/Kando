import { z } from "zod";


export const anoncementSchema = z.object({
    name: z.string().min(7, { message: 'Назва має бути не менше 7 символів' }).max(100, { message: 'Максимально до 100 символів' }),
    price: z.number({ message: 'Неправильний формат ціни' }).nonnegative({ message: 'Вкажіть ціну' }),
    category: z.string().nonempty({ message: 'Оберіть хоча б одну категорію' }).max(70, { message: 'Максимально 70 символів' }),
    location: z.array(z.string()).max(2).optional(),
    categories: z.array(z.string(),{message: "Будь ласка поставте галочки"}).min(5, { message: 'Мінімально 5 категорій'}),
    description: z.string().min(40, { message: 'Мінімум 40 символів в описі' }).max(3000, { message: 'Максимум 3000 символів в описі' }),
    subcategory: z.number({ message: 'Оберіть підкатегорію' }),
})
