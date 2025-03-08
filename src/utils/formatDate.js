export const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    
    const date = new Date(Number(year), Number(month) - 1, Number(day));

    return new Intl.DateTimeFormat('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(date);
};
