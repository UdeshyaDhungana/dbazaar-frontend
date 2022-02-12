
function unknownErrorToast(toast) {
    toast({
        title: "Unknown Error",
        description: "An unknown error occured",
        duration: 5000,
        status: "error",
        isClosable: false,
    })
}

export default unknownErrorToast;