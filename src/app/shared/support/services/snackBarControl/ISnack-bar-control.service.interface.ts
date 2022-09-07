export default interface ISnackBarControlService {
    showMessage: (message: string, error: boolean) => void
}