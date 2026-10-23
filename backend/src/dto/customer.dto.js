class CreateCustomerDTO {
    constructor(data) {
        this.name = data.name?.trim();
        this.email = data.email?.trim().toLowerCase();
        this.address = data.address?.trim();
        this.contactNumber = data.contactNumber;
    }
}

module.exports = {
    CreateCustomerDTO
};