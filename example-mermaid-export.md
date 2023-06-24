# Example Mermaid Export

The export from the tool can be embedded in Markdown and rendered in Github

## With Images
Probably won't work due to hot linking issues

```mermaid
%%{init: {"flowchart": {"defaultRenderer": "elk"}} }%%
flowchart LR
landing-page(<img src='journeys/screenshots/landing-page.png' width='37px' height='81px' alt='Landing page' />\nLanding page)
chocolate-listing-page(<img src='journeys/screenshots/chocolate-listing-page.png' width='37px' height='81px' alt='Chocolate listing page' />\nChocolate listing page)
chocolate-detail-page(<img src='journeys/screenshots/chocolate-detail-page.png' width='37px' height='81px' alt='Chocolate detail page' />\nChocolate detail page)
basket-page(<img src='journeys/screenshots/basket-page.png' width='37px' height='81px' alt='Basket page' />\nBasket page)
login-page(<img src='journeys/screenshots/login-page.png' width='37px' height='81px' alt='Login page' />\nLogin page)
payment-details-page(<img src='journeys/screenshots/payment-details-page.png' width='37px' height='81px' alt='Payment details page' />\nPayment details page)
confirm-order-page(<img src='journeys/screenshots/confirm-order-page.png' width='37px' height='81px' alt='Confirm order page' />\nConfirm order page)
order-confirmation-page(<img src='journeys/screenshots/order-confirmation-page.png' width='37px' height='81px' alt='Order confirmation page' />\nOrder confirmation page)
flower-listing-page(<img src='journeys/screenshots/flower-listing-page.png' width='37px' height='81px' alt='Flower listing page' />\nFlower listing page)
flower-detail-page(<img src='journeys/screenshots/flower-detail-page.png' width='37px' height='81px' alt='Flower detail page' />\nFlower detail page)
post-select-chocolate-subscription-frequency(<img src='journeys/screenshots/post-select-chocolate-subscription-frequency.png' width='37px' height='81px' alt='Select chocolate subscription frequency' />\nSelect chocolate subscription frequency)
account-details-page(<img src='journeys/screenshots/account-details-page.png' width='37px' height='81px' alt='Account details page' />\nAccount details page)
address-details-page(<img src='journeys/screenshots/address-details-page.png' width='37px' height='81px' alt='Address details page' />\nAddress details page)

landing-page --> |Select chocolates| chocolate-listing-page
chocolate-listing-page --> |Select chocolate to buy| chocolate-detail-page
chocolate-detail-page --> |Add chocolate to basket| basket-page
basket-page --> |Proceed to checkout| login-page
login-page --> |Log into account| payment-details-page
payment-details-page --> |Submit payment details| confirm-order-page
confirm-order-page --> |Confirm order| order-confirmation-page
landing-page --> |Select flowers| flower-listing-page
flower-listing-page --> |Select flower package to buy| flower-detail-page
flower-detail-page --> |Add flower package to basket| basket-page
chocolate-detail-page --> |Select chocolate subscription frequency| post-select-chocolate-subscription-frequency
post-select-chocolate-subscription-frequency --> |Add chocolate subscription to basket| basket-page
login-page --> |Register account| account-details-page
account-details-page --> |Submit personal details| address-details-page
address-details-page --> |Submit address details| payment-details-page
```

## Without

```mermaid
%%{init: {"flowchart": {"defaultRenderer": "elk"}} }%%
flowchart LR
landing-page(Landing page)
chocolate-listing-page(Chocolate listing page)
chocolate-detail-page(Chocolate detail page)
basket-page(Basket page)
login-page(Login page)
payment-details-page(Payment details page)
confirm-order-page(Confirm order page)
order-confirmation-page(Order confirmation page)
flower-listing-page(Flower listing page)
flower-detail-page(Flower detail page)
post-select-chocolate-subscription-frequency(Select chocolate subscription frequency)
account-details-page(Account details page)
address-details-page(Address details page)

landing-page --> |Select chocolates| chocolate-listing-page
chocolate-listing-page --> |Select chocolate to buy| chocolate-detail-page
chocolate-detail-page --> |Add chocolate to basket| basket-page
basket-page --> |Proceed to checkout| login-page
login-page --> |Log into account| payment-details-page
payment-details-page --> |Submit payment details| confirm-order-page
confirm-order-page --> |Confirm order| order-confirmation-page
landing-page --> |Select flowers| flower-listing-page
flower-listing-page --> |Select flower package to buy| flower-detail-page
flower-detail-page --> |Add flower package to basket| basket-page
chocolate-detail-page --> |Select chocolate subscription frequency| post-select-chocolate-subscription-frequency
post-select-chocolate-subscription-frequency --> |Add chocolate subscription to basket| basket-page
login-page --> |Register account| account-details-page
account-details-page --> |Submit personal details| address-details-page
address-details-page --> |Submit address details| payment-details-page
```