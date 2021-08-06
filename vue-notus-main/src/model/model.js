const debug = process.env.NODE_ENV !== 'production';

export function undo() {
    return debug;
}

export function redo(data) {
    return data;
}

export function no_undo() {
    return debug;
}

export function no_redo(data) {
    return data;
}