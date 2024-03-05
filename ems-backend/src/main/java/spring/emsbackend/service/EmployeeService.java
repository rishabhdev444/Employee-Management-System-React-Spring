package spring.emsbackend.service;

import spring.emsbackend.dto.EmployeeDTO;

import java.util.List;

public interface EmployeeService {
    EmployeeDTO createEmployee(EmployeeDTO employeeDTO);

    EmployeeDTO getEmployeeById(Long employeeId);

    List<EmployeeDTO> getAllEmployees();

    EmployeeDTO updateEmployee(Long employeeId,EmployeeDTO updatedEmployee);

    void deleteEmployee(Long employeeId);

}
