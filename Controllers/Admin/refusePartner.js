// Import Models
const Partner = require('../../models/Partner');
const Admin = require('../../models/Admin');
// Import Utils 
const sendResponse = require('../../Utils/sendResponse');

// refusePartner Controller for refusing a partner with specefic (partnerID)
const refusePartner = async (req, res, next) => {
    try {
        const admin = await Admin.findById({ _id: req.user._id });
        if(!admin) {
            return sendResponse(res, 404, 'لا يُوجد ذلك المسئول');
        } else {
            const partnerID = req.params.partnerID;
            const partner = await Partner.findByIdAndUpdate({ _id: partnerID }, { partnerApp: 'refusedApp' }, { new: true });
            return sendResponse(res, 200, 'لم يتم قبول طلبك حاول أن ترسل مرة أخرى', partner);
        }
       
    } catch (err) {
        return sendResponse(res, 500, err.message);

    }
}

// Export acceptPartner
module.exports = refusePartner;
