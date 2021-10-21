export const types = {
    login: '[Auth] Login',
    logout: '[Auth] Logout',

    messageSetError: '[UI] Cambiar Error',
    messageRemoveError: '[UI] Quitar Error',
    messageStartLoading: '[UI] Empezar loading',
    messageFinishLoading: '[UI] Finalizar loading',

    uiOpenModal: '[ui] Abre el modal',
    uiCloseModal: '[ui] Cierra el modal',

    projectAddNew: '[Project] Añadir nuevo proyectos (al sidebar)',
    projectActive: '[Project] Establecer proyecto como activo',
    projectsLoad: '[Project] Cargar proyectos (al sidebar)',
    projectUpdated: '[Project] Modificar datos del proyecto guardado',
    projectDelete: '[Project] Borrar nota',
    projectLogoutCleaning: '[Project] Logout limpiar notas en memoria',

    taskAdd: '[Task] Añadir tareas a un proyecto',
    //tasksLoad: '[Task] cargar tareas de los proyectos',
    tasksProject: '[Task] filtra las tareas de cada proyecto',
}