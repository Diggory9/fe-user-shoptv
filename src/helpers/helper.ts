import dayjs from "dayjs";

export const numberFormatLocationVietNam = (number: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
}
export const formattedDateTime = (date: any) => {
    // Check if the date is already a Date object
    if (!(date instanceof Date)) {
        // If not, try to convert it to a Date object
        date = new Date(date);
    }

    // Define options for toLocaleDateString
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };

    // Return the formatted date string
    return date.toLocaleDateString('vi-VN', options);
};

export const handlePriceBeforeDiscount = ({ price, typeDiscout, valueDiscount }: { price: number, typeDiscout: string | null, valueDiscount: number | null }) => {
    if (typeDiscout === null) {
        return price;
    }
    else if (typeDiscout.toUpperCase() === 'PERCENTAGE') {
        return price * (1 - valueDiscount! / 100);
    } else if (typeDiscout.toUpperCase() === 'FIX-AMOUNT') {
        return price - valueDiscount!;
    }
}
export const formatDateToRender = (date?: Date | string) => {
    if (!date) return '';
    return formatDate(date, 'DD/MM/YYYY');
};
export const formatDate = (date?: Date | string | dayjs.Dayjs | null, format?: string) => {
    return dayjs(date || new Date()).format(format || 'YYYY-MM-DD');
};
