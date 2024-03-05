package spring.emsbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import spring.emsbackend.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee,Long> {
}
