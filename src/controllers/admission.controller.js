import Students from "../models/admission.models.js";

const dummy = async (req, res) => {
    const { name } = req.body;

    console.log(name);
}

export {
    dummy
}