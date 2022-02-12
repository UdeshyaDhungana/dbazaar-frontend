
function unknownErrorToast(toast) {
    toast({
        title: "Unknown Error",
        description: "An unknown error occured",
        duration: 4000,
        status: "error",
        isClosable: false,
    })
}

export default unknownErrorToast;