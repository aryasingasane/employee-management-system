package com.ems.service;

import com.ems.dto.EmployeeRequest;
import com.ems.dto.EmployeeResponse;
import com.ems.entity.Employee;
import com.ems.entity.Role;
import com.ems.entity.User;
import com.ems.exception.ResourceNotFoundException;
import com.ems.repository.EmployeeRepository;
import com.ems.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    // Constructor injection (replaces @RequiredArgsConstructor)
    public EmployeeService(EmployeeRepository employeeRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.employeeRepository = employeeRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public EmployeeResponse addEmployee(EmployeeRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }

        // Check if employee ID already exists
        if (employeeRepository.existsByEmployeeId(request.getEmployeeId())) {
            throw new IllegalArgumentException("Employee ID already exists");
        }
        
        // Check if employee ID already exists
        if (employeeRepository.existsByEmployeeId(request.getEmployeeId())) {
            throw new IllegalArgumentException("Employee ID already exists");
        }

        // Determine Role and Password
        String defaultPassword = "emp123";
        Role role = Role.EMPLOYEE;

        if (request.getDesignation() != null && request.getDesignation().equalsIgnoreCase("HR Manager")) {
            defaultPassword = "hr123";
            role = Role.HR_MANAGER;
        }

        // Create User
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(defaultPassword));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setRole(role);
        User savedUser = userRepository.save(user);

        // Create Employee
        Employee employee = new Employee();
        employee.setUser(savedUser);
        employee.setEmployeeId(request.getEmployeeId());
        employee.setEmail(request.getEmail());
        employee.setFirstName(request.getFirstName());
        employee.setLastName(request.getLastName());
        employee.setDesignation(request.getDesignation());
        employee.setSalary(request.getSalary());
        employee.setDepartment(request.getDepartment());
        employee.setAddress(request.getAddress());
        employee.setPhone(request.getPhone());
        Employee savedEmployee = employeeRepository.save(employee);

        return mapToResponse(savedEmployee, savedUser);
    }

    public List<EmployeeResponse> getAllEmployees() {
        return employeeRepository.findAll().stream()
                .map(emp -> mapToResponse(emp, emp.getUser()))
                .collect(Collectors.toList());
    }

    public EmployeeResponse getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
        return mapToResponse(employee, employee.getUser());
    }

    public EmployeeResponse getEmployeeByUserId(Long userId) {
        Employee employee = employeeRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found for user id: " + userId));
        return mapToResponse(employee, employee.getUser());
    }

    @Transactional
    public EmployeeResponse updateEmployee(Long id, EmployeeRequest request) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));

        User user = employee.getUser();

        // Update user details
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        if (!user.getEmail().equals(request.getEmail())) {
            if (userRepository.existsByEmail(request.getEmail())) {
                throw new IllegalArgumentException("Email already exists");
            }
            user.setEmail(request.getEmail());
        }
        userRepository.save(user);

        // Update employee details
        if (!employee.getEmployeeId().equals(request.getEmployeeId())) {
            if (employeeRepository.existsByEmployeeId(request.getEmployeeId())) {
                throw new IllegalArgumentException("Employee ID already exists");
            }
            employee.setEmployeeId(request.getEmployeeId());
        }
        employee.setFirstName(request.getFirstName());
        employee.setLastName(request.getLastName());
        employee.setDesignation(request.getDesignation());
        employee.setSalary(request.getSalary());
        employee.setDepartment(request.getDepartment());
        employee.setAddress(request.getAddress());
        employee.setPhone(request.getPhone());
        Employee updatedEmployee = employeeRepository.save(employee);

        return mapToResponse(updatedEmployee, user);
    }

    @Transactional
    public EmployeeResponse updateEmployeeProfile(Long userId, EmployeeRequest request) {
        Employee employee = employeeRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found for user id: " + userId));

        User user = employee.getUser();

        // Update only allowed fields for employee
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        userRepository.save(user);

        employee.setFirstName(request.getFirstName());
        employee.setLastName(request.getLastName());
        employee.setAddress(request.getAddress());
        employee.setPhone(request.getPhone());
        Employee updatedEmployee = employeeRepository.save(employee);

        return mapToResponse(updatedEmployee, user);
    }

    @Transactional
    public void deleteEmployee(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
        
        User user = employee.getUser();
        employeeRepository.delete(employee);
        userRepository.delete(user);
    }

    private EmployeeResponse mapToResponse(Employee employee, User user) {
        EmployeeResponse response = new EmployeeResponse();
        response.setId(employee.getId());
        response.setEmployeeId(employee.getEmployeeId());
        response.setFirstName(employee.getFirstName());
        response.setLastName(employee.getLastName());
        response.setEmail(user.getEmail());
        response.setDesignation(employee.getDesignation());
        response.setSalary(employee.getSalary());
        response.setDepartment(employee.getDepartment());
        response.setAddress(employee.getAddress());
        response.setPhone(employee.getPhone());
        response.setUserId(user.getId());
        return response;
    }
}