# Core Workflows

## 1. Overview

This document describes the main operational workflows for the delivery management system.

These workflows are based on the business owner's original needs:

- easier merchant settlement
- faster grouping of deliveries by township/route
- easier parcel follow-up
- rider-by-rider delivery counting
- visibility into merchant parcel totals and money to settle back

---

## 2. Workflow: Merchant Management

### Goal

Allow staff to create and maintain merchant records for shops/businesses that use the delivery service.

### Steps

1. Staff receives merchant information from a shop/business
2. Staff creates merchant record in the system
3. Staff saves merchant contact details
4. Staff uses this merchant when creating parcels

### Result

The merchant becomes a valid sender/client in the system and can be linked to parcel records.

### Notes

- Merchant is created internally by staff in MVP
- Public merchant self-signup is not required in MVP

---

## 3. Workflow: Rider Management

### Goal

Allow staff/admin to manage riders and assign parcels to them.

### Steps

1. Admin or staff creates rider profile
2. Rider is marked active
3. Staff can assign parcels to that rider
4. Rider appears in rider summary/reporting

### Result

Riders can be tracked as operational delivery staff.

---

## 4. Workflow: Parcel Intake / Parcel Creation

### Goal

Allow staff to record a new parcel submitted by a merchant.

### Steps

1. Merchant gives parcel to the business
2. Staff opens parcel creation form
3. Staff selects merchant
4. Staff enters receiver name and phone
5. Staff enters address and township
6. Staff records COD amount
7. Staff records delivery fee
8. Staff optionally assigns a rider immediately, or leaves parcel unassigned
9. Staff saves parcel

### Result

A new parcel is added to the system and can now be tracked operationally.

### Important Data

- merchant
- receiver
- address
- township
- COD amount
- delivery fee
- rider assignment
- notes

### Notes

- Township is important because the business explicitly wants fast location-based grouping
- COD and delivery fee must be stored separately

---

## 5. Workflow: Township-Based Dispatching

### Goal

Allow office staff to organize deliveries quickly by township/route.

### Steps

1. Staff opens parcel list / dispatch board
2. Staff filters parcels by township
3. Staff reviews parcels in the selected township
4. Staff assigns one or more parcels to a rider
5. Parcel status changes from pending to assigned if applicable

### Result

Parcels are organized for daily delivery operations by location.

### Notes

- This is one of the most important workflows for the business owner
- Speed and clarity matter more than fancy UI

---

## 6. Workflow: Rider Assignment

### Goal

Assign parcels to individual riders so staff can track responsibility and workload.

### Steps

1. Staff views pending or unassigned parcels
2. Staff selects rider
3. Staff assigns parcel to rider
4. Assigned rider is stored on parcel
5. Parcel becomes visible in rider-specific views/reports

### Result

The system knows which rider is responsible for which parcel.

### Notes

- Bulk assignment may be added later
- MVP can start with per-parcel assignment

---

## 7. Workflow: Parcel Follow-Up / Status Update

### Goal

Allow staff or riders to update parcel delivery progress and make follow-up easier.

### Suggested Status Flow

- pending
- assigned
- out_for_delivery
- delivered
- failed_delivery
- return_to_sender
- settled

### Steps

1. Staff or rider opens parcel record
2. Current parcel status is displayed
3. User updates status based on delivery result
4. System saves the new status
5. Parcel list and summaries reflect the new status

### Example

- Parcel is created as pending
- Staff assigns it to a rider
- Rider starts route and marks out_for_delivery
- Rider completes delivery and marks delivered
- Delivered parcel becomes eligible for settlement summary

### Result

Everyone can follow delivery progress clearly.

### Notes

- Status should be visible in list and detail views
- Status changes affect merchant summary and settlement logic

---

## 8. Workflow: Rider Performance Tracking

### Goal

Measure how many parcels each rider handled.

### Steps

1. Admin/staff opens rider summary page
2. System groups parcel data by rider
3. System shows counts such as:
   - assigned parcels
   - delivered parcels
   - failed deliveries
   - returns if applicable
4. Staff/admin reviews performance by rider

### Result

The business can see each rider’s workload and output.

### Notes

- This workflow comes directly from the business owner's request
- Compensation logic is out of scope unless explicitly added later

---

## 9. Workflow: Merchant Parcel Summary

### Goal

Allow staff/admin to see parcel and money totals by merchant.

### Steps

1. Staff/admin opens merchant summary view
2. System groups parcel data by merchant
3. System shows:
   - total parcels submitted
   - delivered count
   - COD total
   - delivery fee total
   - estimated net payable

### Result

Staff/admin can quickly answer:

- how many parcels a merchant submitted
- how much money is owed back to that merchant

### Notes

- This is one of the most important business-facing workflows
- COD and fees must remain clearly separated

---

## 10. Workflow: Merchant Settlement Calculation

### Goal

Calculate how much should be paid back to a merchant.

### Basic Formula

Net payable to merchant = total COD collected - total applicable fees

### Steps

1. Staff/admin selects merchant or settlement period
2. System finds eligible parcels, usually delivered parcels
3. System totals COD amount
4. System totals delivery fees and other applicable charges
5. System calculates net payable
6. Staff/admin reviews parcel list included in settlement
7. Settlement is marked unpaid or paid

### Result

The business can reconcile merchant money more easily.

### Notes

- Exact settlement rules may change depending on business policy
- Failed deliveries and returns may need separate charge rules
- Settlement should remain traceable back to parcel-level data

---

## 11. Workflow: Daily Operations Review

### Goal

Give office staff one place to monitor current work.

### Steps

1. Staff signs in
2. Staff opens dashboard or parcel list
3. Staff checks:
   - pending parcels
   - assigned parcels
   - township grouping
   - parcels requiring follow-up
4. Staff assigns riders or updates records as needed

### Result

The system supports day-to-day operations instead of just reporting.

---

## 12. Workflow: Rider-Side Delivery Update (Optional MVP / Early Phase)

### Goal

Allow riders to see their assigned parcels and update results directly.

### Steps

1. Rider signs in
2. Rider views assigned parcels
3. Rider opens parcel
4. Rider updates status to delivered, failed_delivery, or return_to_sender
5. System saves update
6. Office staff can see the updated result

### Result

Operational updates can happen closer to the field instead of only in the office.

### Notes

- This can be introduced after office/staff workflows are stable
- A responsive web page is enough for the first version

---

## 13. Workflow Dependencies

### Foundational Workflows

These should exist first:

- internal authentication
- merchant management
- rider management
- parcel creation
- parcel status updates

### Reporting Workflows

These depend on parcel data being clean:

- rider performance tracking
- merchant parcel summary
- settlement calculation

### Key Principle

Operations data must be reliable before accounting/reporting becomes trustworthy.

---

## 14. MVP Workflow Priority

Recommended build order:

1. Internal authentication
2. Merchant management
3. Rider management
4. Parcel creation
5. Parcel list with township/status/rider filters
6. Rider assignment
7. Parcel status update
8. Rider summary
9. Merchant summary
10. Settlement summary

This order matches both:

- technical practicality
- the business owner’s original needs
