//package com.ems.dto;
//
//import jakarta.validation.constraints.*;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//public class EmployeeRequest {
//
//    @NotBlank(message = "Employee ID is required")
//    private String employeeId;
//
//    @NotBlank(message = "First name is required")
//    private String firstName;
//
//    @NotBlank(message = "Last name is required")
//    private String lastName;
//
//    @NotBlank(message = "Email is required")
//    @Email(message = "Invalid email format")
//    private String email;
//
//    @NotBlank(message = "Password is required")
//    @Size(min = 6, message = "Password must be at least 6 characters")
//    private String password;
//
//    @NotBlank(message = "Designation is required")
//    private String designation;
//
//    @NotNull(message = "Salary is required")
//    @Min(value = 0, message = "Salary must be positive")
//    private Double salary;
//
//    @NotBlank(message = "Department is required")
//    private String department;
//
//    @NotBlank(message = "Address is required")
//    private String address;
//
//    @NotBlank(message = "Phone is required")
//    @Pattern(regexp = "^[+]?[0-9]{10,15}$", message = "Invalid phone number")
//    private String phone;
//}

package com.ems.dto;

import jakarta.validation.constraints.*;

public class EmployeeRequest {

    @NotBlank(message = "Employee ID is required")
    private String employeeId;

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    private String password;

    @NotBlank(message = "Designation is required")
    private String designation;

    @NotNull(message = "Salary is required")
    @Min(value = 0, message = "Salary must be positive")
    private Double salary;

    @NotBlank(message = "Department is required")
    private String department;

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "Phone is required")
    @Pattern(regexp = "^[+]?[0-9]{10,15}$", message = "Invalid phone number")
    private String phone;

    public EmployeeRequest() {
    }

    public EmployeeRequest(String employeeId, String firstName, String lastName, String email, String password, 
                          String designation, Double salary, String department, String address, String phone) {
        this.employeeId = employeeId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.designation = designation;
        this.salary = salary;
        this.department = department;
        this.address = address;
        this.phone = phone;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}