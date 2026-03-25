# Project Requirements

## 1. Project Overview

This project is an internal web application for a Myanmar delivery business.

The system is intended to help office staff manage parcel operations, organize deliveries by township/route, track rider performance, and calculate how much money must be settled back to each merchant.

The goal is to replace manual tracking through chat messages, spreadsheets, and ad-hoc accounting with a single operational dashboard.

This is not a full public logistics platform in the first phase. The MVP focuses on internal business operations.

---

## 2. Original Business Need

The business owner wants a system that supports two main areas:

1. Merchant-facing accounting and settlement visibility
   - View how many parcels each merchant submitted
   - View how much COD money has been collected
   - View how much money should be returned to each merchant
   - Make settlement and reconciliation easier

2. Delivery operations and rider tracking
   - Sort and group deliveries by township/route quickly
   - Follow up on parcel delivery status
   - Track how many deliveries each rider handled
   - Measure rider workload and performance

Original intent from business owner:

- easier money settlement for shops/clients who hand parcels to the business
- faster grouping of delivery ways by township
- easier follow-up on parcel status
- rider-by-rider delivery counting
- easy visibility into how many parcels a specific shop submitted and how much must be settled back

---

## 3. Product Goal

Build a practical, low-complexity internal operations system that can be launched quickly and used for real business work.

The product should:

- be easy for office staff to use
- reduce manual accounting confusion
- make parcel operations trackable
- support low traffic / early-stage business usage
- be extendable later without requiring a full rewrite

---

## 4. Users and Roles

### 4.1 Admin

Admin manages the overall system and has full access.

Responsibilities:

- manage staff accounts
- manage merchants
- manage riders
- view all parcels
- view reports and settlement summaries
- confirm settlement/payment records

### 4.2 Office Staff / Dispatcher

Office staff handle daily operations.

Responsibilities:

- create and update parcels
- assign riders
- filter parcels by township/route
- follow up on delivery status
- prepare merchant settlement summaries

### 4.3 Rider

Riders handle deliveries.

Responsibilities:

- view assigned parcels
- update parcel delivery status
- optionally record notes about failed or completed delivery

### 4.4 Merchant (Future Phase)

Merchant access is optional and not included in MVP.

Possible future responsibilities:

- view own parcels
- view own settlement history
- track delivery progress

---

## 5. Domain Glossary

### Merchant

A shop, seller, or business client who uses the delivery service to send parcels.

Important:

- Merchant is the sender/client of the delivery company
- Merchant is not the parcel receiver

### Receiver

The end customer who receives the parcel.

### Rider

Delivery staff who transport and deliver parcels.

### Parcel

A delivery item submitted by a merchant to be delivered to a receiver.

### COD

Cash on Delivery.
Money collected from the receiver on behalf of the merchant.

Important:

- COD is not company revenue
- COD is merchant money that is temporarily collected and later settled back to the merchant

### Delivery Fee

The fee charged for delivery service.
This is company revenue.

### Settlement

The process of calculating how much money should be paid back to a merchant after deducting delivery fees and other applicable charges.

### Township / Route / Way

Operational grouping used by staff to organize deliveries efficiently by location.

### Parcel Status

Operational state of a parcel, such as pending, assigned, out for delivery, delivered, failed delivery, return to sender, or settled.

---

## 6. Core Problems to Solve

### 6.1 Merchant accounting is hard to track manually

The business needs to know:

- which merchant submitted how many parcels
- how much COD was collected for those parcels
- how much delivery fee or other charges apply
- how much net amount must be returned to the merchant

### 6.2 Parcel operations are hard to organize quickly

The business needs to:

- group parcels by township/route
- assign riders efficiently
- see parcel follow-up status clearly

### 6.3 Rider productivity is hard to measure

The business needs to know:

- how many parcels each rider delivered
- how many deliveries failed
- which rider handled which parcels

---

## 7. MVP Scope

### Included in MVP

#### 7.1 Internal Authentication

- staff login
- protected internal dashboard
- minimal role support for admin and office staff
- rider login may be included in simplified form if needed

#### 7.2 Merchant Management

- create merchant
- edit merchant
- store contact information
- store payout-related information if needed later
- activate/deactivate merchant

#### 7.3 Rider Management

- create rider
- edit rider
- activate/deactivate rider
- basic rider profile

#### 7.4 Township / Delivery Area Management

- create township/delivery area list
- use township as a key parcel grouping/filter dimension

#### 7.5 Parcel Management

- create parcel
- edit parcel
- assign merchant
- record receiver details
- record delivery address and township
- record COD amount
- record delivery fee
- assign rider
- update parcel status
- view parcel details
- view parcel list with filters

#### 7.6 Dispatch / Operations View

- filter by township
- filter by status
- filter by rider
- bulk-friendly parcel list for daily operations
- quick follow-up for pending and assigned deliveries

#### 7.7 Rider Summary

- total assigned parcels
- delivered count
- failed count
- return count if applicable

#### 7.8 Merchant Summary

- total parcels submitted by merchant
- delivered count
- total COD collected
- total fees
- estimated net amount to settle

#### 7.9 Settlement Summary

- basic merchant settlement calculation
- visible record of unpaid vs paid settlements
- list of parcels included in a settlement summary

---

## 8. Not Included in MVP

The following are out of scope for the first version unless explicitly prioritized later:

- public merchant registration
- customer-facing parcel tracking portal
- advanced route optimization
- real-time map tracking
- mobile app
- complex billing automation
- accounting software integration
- high-complexity notification system
- enterprise-scale multi-branch support
- fully automated rider payroll logic

---

## 9. Core Functional Requirements

### 9.1 Authentication and Access

- Only authorized internal users can access the dashboard
- Unauthenticated users must be redirected to sign in
- Admin has full access
- Office staff can manage daily operations
- Rider access should be limited to assigned deliveries if rider login is included in MVP

### 9.2 Merchant Management

The system must allow staff to:

- create a merchant record
- update merchant details
- search merchants
- view merchant parcel and settlement summaries

### 9.3 Rider Management

The system must allow staff to:

- create a rider record
- update rider details
- assign parcels to riders
- review rider delivery counts

### 9.4 Parcel Creation

The system must allow staff to record:

- merchant
- receiver name
- receiver phone
- delivery address
- township
- COD amount
- delivery fee
- rider assignment
- notes if needed

### 9.5 Parcel Status Tracking

The system must support clear parcel status tracking.

Suggested initial statuses:

- pending
- assigned
- out_for_delivery
- delivered
- failed_delivery
- return_to_sender
- settled

The system should show current status clearly in parcel lists and parcel details.

### 9.6 Dispatch and Filtering

The system must allow staff to:

- filter parcels by township
- filter parcels by rider
- filter parcels by status
- quickly identify which parcels need follow-up

### 9.7 Rider Performance

The system must allow staff/admin to view:

- assigned parcel count by rider
- delivered parcel count by rider
- failed parcel count by rider
- optionally date-based filtering

### 9.8 Merchant Summary

The system must allow staff/admin to view by merchant:

- total parcels submitted
- delivered parcels
- COD total
- fee total
- estimated net payable

### 9.9 Settlement Summary

The system must support a settlement view showing:

- merchant
- date range or batch
- included parcels
- total COD
- total fees
- net payable amount
- payment status

---

## 10. Business Rules

### 10.1 Merchant Meaning

Merchant means the sender/client using the delivery service.

### 10.2 COD Meaning

COD is money collected from the receiver and later returned to the merchant after applicable deductions.

### 10.3 COD and Revenue Must Be Separate

The system must never treat COD as company revenue.

Required separation:

- COD amount
- delivery fee
- net payable to merchant

### 10.4 Settlement Must Be Traceable

Settlement should be explainable from parcel records.
Staff should be able to understand why a merchant is owed a specific amount.

### 10.5 Parcel Status Affects Reporting

Merchant summary, rider summary, and settlement logic depend on parcel status.

Example:

- delivered parcels may count toward COD and settlement
- failed deliveries may not count the same way
- return parcels may require separate treatment

### 10.6 Township Is a Key Operational Field

Township is required because the business explicitly wants fast grouping of delivery routes by area.

---

## 11. Non-Functional Requirements

### 11.1 Fast to Build

The system should be designed for quick delivery with minimal unnecessary architecture.

### 11.2 Easy to Use

The UI should be easy for non-technical office staff.

### 11.3 Commercially Usable

The system should be suitable for real business usage, even if early scale is small.

### 11.4 Maintainable

Business logic should be explicit, typed, and easy to understand.

### 11.5 Auditable

Money-related calculations should be clear and reproducible.

---

## 12. Proposed Technical Direction

This is an implementation direction, not a business requirement.

- Next.js full-stack application
- Supabase for database/auth/storage
- Cloudflare Pages for deployment
- Cloudflare Cron for scheduled keep-alive or maintenance job
- Server Actions for internal form workflows
- Zod for server-side validation
- Minimal client-side form complexity where possible

---

## 13. Open Questions

The following business questions still need answers before some features can be finalized:

1. Is delivery fee fixed by township, by parcel size, or manually entered?
2. If the receiver pays the delivery fee, how should that be recorded?
3. Can the receiver pay by cash and bank transfer, or cash only?
4. How should failed delivery be charged?
5. How should return-to-sender parcels be charged?
6. How often are merchant settlements done: daily, weekly, or on demand?
7. Does rider performance eventually affect compensation?
8. Should parcel status history be visible in MVP?
9. Should one parcel always belong to exactly one merchant?
10. Does the business need proof-of-delivery images in MVP?

---

## 14. Initial Data Entities

Suggested initial entities:

- users
- merchants
- riders
- townships
- parcels
- parcel_status_history
- settlements
- settlement_items

---

## 15. Success Criteria for MVP

The MVP is successful if staff can:

- sign in securely
- create and manage merchants
- create and manage riders
- create parcels with merchant and receiver details
- group and filter parcels by township
- assign parcels to riders
- update parcel delivery status
- view rider delivery counts
- view merchant parcel totals
- view estimated amount to settle back to each merchant
