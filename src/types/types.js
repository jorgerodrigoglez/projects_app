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
    projectDelete: '[Project] Borra un proyecto - titulo y descripcion -',
    projectLogoutCleaning: '[Project] Logout limpiar los proyectos en memoria',

    taskAdd: '[Task] Añadir tareas a un proyecto',
    tasksProject: '[Task] Filtra las tareas de cada proyecto',
    taskCheck: '[Task] Cambia el check de la tarea',
    taskActive: '[Task] Establecer la tarea como activa',
    taskActiveReflesh: '[Task] Eliminar la tarea activa',
    taskDelete: '[Task] Elimina una tarea especifica',
    tasksLogoutCleaning: '[Task] Logout limpia las tareas en memoria',
    tasksProjectDelete: '[Tasks] Borra las tareas de un proyecto determinado',
}