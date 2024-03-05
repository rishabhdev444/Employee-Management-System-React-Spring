package spring.emsbackend.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import spring.emsbackend.dto.EmployeeDTO;
import spring.emsbackend.entity.Employee;
import spring.emsbackend.exception.ResourceNotFoundException;
import spring.emsbackend.mapper.EmployeeMapper;
import spring.emsbackend.repository.EmployeeRepository;
import spring.emsbackend.service.EmployeeService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {


    private EmployeeRepository employeeRepository;
    @Override
    public EmployeeDTO createEmployee(EmployeeDTO employeeDTO) {
        Employee employee= EmployeeMapper.mapToEmployee(employeeDTO);
        Employee savedEmployee=employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDTO getEmployeeById(Long employeeId) {
        Employee employee=employeeRepository.findById(employeeId).orElseThrow(()->new ResourceNotFoundException("Employee is not exist with given id : "+employeeId));
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDTO> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream().map((employee -> EmployeeMapper.mapToEmployeeDto(employee))).collect(Collectors.toList());
    }

    @Override
    public EmployeeDTO updateEmployee(Long employeeId, EmployeeDTO updatedEmployee) {
        Employee employee=employeeRepository.findById(employeeId).orElseThrow(()->new ResourceNotFoundException("Employee is not exist with given id : "+employeeId));
        employee.setFirstName(updatedEmployee.getFirstName());
        employee.setLastName(updatedEmployee.getLastName());
        employee.setEmail(updatedEmployee.getEmail());

        Employee newUpdatedEmployee = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(newUpdatedEmployee);
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        Employee employee=employeeRepository.findById(employeeId).orElseThrow(()->new ResourceNotFoundException("Employee is not exist with given id : "+employeeId));

        employeeRepository.deleteById(employeeId);
    }

}
