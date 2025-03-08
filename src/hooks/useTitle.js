import { useEffect } from "react";

const useTitle = (title) => {
    useEffect(() => {
        document.title = `Gamers Guild - ${title}`
    }, [title]);
};

export default useTitle;