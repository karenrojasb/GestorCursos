Type '(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void' is not assignable to type 'ChangeEventHandler<HTMLSelectElement>'.
  Types of parameters 'e' and 'event' are incompatible.
    Type 'ChangeEvent<HTMLSelectElement>' is not assignable to type 'ChangeEvent<HTMLInputElement | HTMLTextAreaElement>'.
      Type 'HTMLSelectElement' is not assignable to type 'HTMLInputElement | HTMLTextAreaElement'.
        Type 'HTMLSelectElement' is missing the following properties from type 'HTMLInputElement': accept, align, alt, capture, and 38 more.ts(2322)
index.d.ts(3342, 9): The expected type comes from property 'onChange' which is declared here on type 'DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>'
