/**
 * 
 * @param {*} message - El mensaje que se muestra en pantalla debajo del spinner
 * @returns 
 */
function Loader( {message} ) {
    return (
        <div className="loader-overlay">
            <div className="text-center">
                <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="mt-3 fw-bold text-success">{ message }</p>
            </div>
        </div>
    );
}

export default Loader