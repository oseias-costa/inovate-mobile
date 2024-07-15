
export const statusFormtter = (status: string) => {
    const statusData: { [key: string]: string } = {
        "EXPIRED": "Vencido",
        "PENDING": "Pendente",
        "FINISH": "Concluído"
    }

    return statusData[status]
}