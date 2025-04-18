// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Certificate {
    struct Cert {
        string id;
        string name;
        string course;
        string date;
        string issuer;
    }

    mapping(string => Cert) public certificates;

    function issueCertificate(string memory _id, string memory _name, string memory _course, string memory _date, string memory _issuer) public {
        certificates[_id] = Cert(_id,_name, _course, _date, _issuer);
    }

    function getCertificate(string memory _id) public view returns (Cert memory) {
        return certificates[_id];
    }
}

