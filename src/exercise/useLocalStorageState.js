import React from 'react'

const useLocalStorageState  = (key, initialValue) => {
    const getInitialValue = () => {
        let value = typeof initialValue === 'function' ? initialValue() : initialValue 
        try {
            value = JSON.parse(window.localStorage.getItem(key))
        }
        catch {
            window.localStorage.removeItem(key)
        }
        return value
    }
    const [variable, setVariable] = React.useState(getInitialValue)

    React.useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(variable))
    }, [key, variable])

    return [variable, setVariable]
}

export default useLocalStorageState 